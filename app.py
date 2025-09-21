from flask import Flask, request, jsonify
from langchain_core.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
import datetime
import os

# Load environment variables from a .env file
load_dotenv()



# Initialize the Flask app
app = Flask(__name__)

# Initialize the language model
llm = ChatGoogleGenerativeAI(model='gemini-1.5-flash', temperature=0.3)

# The detailed prompt template remains the same
detailed_planning_template = """
**Role:** You are a senior Agronomist and Agricultural Economist for India. Your advice is considered the gold standard for accuracy and practicality. You are tasked with creating a detailed, risk-mitigated, and profitable crop plan for a farmer. Your analysis must be precise, your language simple (Hindi), and your recommendations directly tied to the data provided. Do not hallucinate; use realistic data ranges for costs and prices for the specified region.

**Farmer's Data Profile:**
* **Location:** {location}
* **Total Land Area:** {area} acres
* **Soil Report:** {soil_report}
* **Local Weather:** {weather_data}
* **User's Goal:** {query}

**Your Definitive Task:**
1.  **First, analyze the current date ({current_date}) and the user's location to determine the upcoming agricultural season (e.g., Rabi, Kharif, Zaid).** Your entire plan will be based on this upcoming season.
2.  Based on the determined season and the farmer's complete profile, create a comprehensive farming strategy.

**Required Output Format:**

**किसान भाई, आपकी जमीन और बाजार की पूरी जानकारी के आधार पर आने वाले {season_name} सीजन के लिए यह सबसे अच्छी योजना है:**

**1. आपकी जमीन का विश्लेषण (Your Farm's Analysis):**
* संक्षेप में बताएं कि किसान की मिट्टी और मौसम की स्थिति क्या है (e.g., "आपकी मिट्टी हल्की काली दोमट है जिसमें नाइट्रोजन की कमी लेकिन पोटाश भरपूर है। यहाँ का मौसम रबी की फसलों के लिए उत्तम है।").

**2. फसल योजना और जमीन का बंटवारा (Crop Plan & Land Allocation):**
* Provide a clear land allocation strategy. Be explicit. Example: "आपके पास कुल 5 एकड़ जमीन है। हमारा सुझाव है कि आप जोखिम कम करने और मुनाफा पक्का करने के लिए अपनी जमीन को इस तरह बांटें:"
    * **3 एकड़ (60% हिस्से में):** [मुख्य फसल का नाम]
    * **1.5 एकड़ (30% हिस्से में):** [दूसरी फायदेमंद फसल का नाम]
    * **0.5 एकड़ (10% हिस्से में):** [तीसरी, नकदी/प्रयोगिक फसल का नाम]

**3. हर फसल का विस्तृत विश्लेषण (Detailed Analysis for Each Allocated Crop):**
* Create a detailed section for EACH crop mentioned in the allocation plan.

**[Crop Name] ([Allocated Acres] एकड़ में) [Emoji]**

* **क्यों यह फसल आपके लिए सही है? (Why This Crop is Perfect for YOU?):**
    * Directly connect the crop to the user's specific soil report and weather. (e.g., "आपकी मिट्टी का pH 7.2 है जो चने के लिए सर्वोत्तम है। इसमें नाइट्रोजन की कमी है, और चने की फसल हवा से नाइट्रोजन लेकर इस कमी को पूरा करेगी, जिससे अगली फसल को भी फायदा होगा।").
* **आर्थिक विश्लेषण (प्रति एकड़) | Economic Analysis (Per Acre):**
    * **अनुमानित कुल लागत (Estimated Total Cost):** ₹ [Amount].
    * **अनुमानित उपज (Expected Yield):** [Quantity] Quintals/Acre.
    * **मौजूदा बाजार भाव (Current Market Price):** ₹ [Amount] per Quintal.
    * **अनुमानित शुद्ध मुनाफा (Estimated Net Profit per Acre):** ₹ [Amount].
    * **निवेश पर रिटर्न (Return on Investment - ROI):** [Percentage]%.
* **विशेष सलाह (आपकी मिट्टी के अनुसार) | Tailored Advice (As per YOUR soil):**
    * Provide specific fertilizer recommendations based on the N, P, K values from the soil report. (e.g., "नाइट्रोजन की कमी के लिए, बुवाई के समय 25 किलो यूरिया और पहली सिंचाई पर 30 किलो यूरिया डालें। पोटाश डालने की कोई जरूरत नहीं है क्योंकि यह आपकी मिट्टी में पहले से ही अधिक है।").
    * Mention specific irrigation advice suited to the soil type.
* **बाजार की जानकारी | Market Insights:**
    * **मांग (Demand):** [High / Stable].
    * **मूल्य जोखिम (Price Risk):** [Low / Medium / High].

**(Repeat this detailed structure for all crops in the plan)**

**4. योजना का सारांश (Plan Summary):**
* Conclude with a summary table comparing the allocated crops based on 'कुल अनुमानित मुनाफा (Total Estimated Profit from allocated area)', 'कुल लागत (Total Cost)', and 'जोखिम स्तर (Risk Level)'.

**Disclaimer:**
* Add a final, responsible disclaimer.
"""



# Define the endpoint for getting recommendations
@app.route("/recommendation", methods=["POST"])
def get_recommendation():
    """
    API endpoint to generate a crop recommendation plan.
    Expects a JSON payload with farmer's data.
    """
    try:
        # Get the JSON data from the request body
        data = request.get_json()
        
        # Basic validation to ensure required keys are present
        required_keys = ["location", "area", "soil_report", "weather_data", "query"]
        if not all(key in data for key in required_keys):
            return jsonify({"error": "Missing required fields in request body"}), 400

        # --- Get current date dynamically ---
        current_date = datetime.datetime.now().strftime("%B %d, %Y")

        # Prepare the input for the prompt
        prompt_input = {
            "location": data["location"],
            "area": data["area"],
            "soil_report": data["soil_report"],
            "weather_data": data["weather_data"],
            "query": data["query"],
            "current_date": current_date,
            "season_name": "" # The AI will fill this
        }

        # --- Create and Format the Prompt ---
        prompt = PromptTemplate(
            template=detailed_planning_template,
            input_variables=list(prompt_input.keys())
        )
        final_prompt = prompt.invoke(prompt_input)

        # --- Get the AI's Detailed Plan ---
        print("--- Analyzing current season and generating accurate crop plan... ---")
        answer = llm.invoke(final_prompt)
        
        # Return the plan as a JSON response
        return jsonify({"recommendation_plan": answer.content})

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An internal server error occurred"}), 500

# --- Main execution block to run the Flask app ---
if __name__ == "__main__":
    # Use 0.0.0.0 to make it accessible on your local network
    app.run(host='0.0.0.0', port=5000, debug=True)
