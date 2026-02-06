import os
from google import genai

# Ku beddel API_KEY_GAAGA hoose markaad rabto inaad run ahaantii isticmaasho
client = genai.Client(api_key="Please Enter you API key")

conversation_memory = []

# Detect language: English, Somali, Arabic
def detect_language(text):
    arabic_chars = set("ابتثجحخدذرزسشصضطظعغفقكلمنهويةءآأإى")
    if any(char in arabic_chars for char in text):
        return "ar"
    somali_keywords = ["sidee", "maxaa", "yaad", "kee", "yaa", "ma", "maaha", "sida"]
    if any(word in text.lower() for word in somali_keywords):
        return "so"
    return "en"

# Rule-based answers
def rule_based_answers(prompt):
    p = prompt.lower()

    # Creator answers
    if "who created you" in p and "where" not in p:
        return "I was created by Ali Mohamoud Jibriel."

    if "where were you created" in p or ("where" in p and "created" in p and "who" not in p):
        return "I was created in Gabiley, Somaliland."

    if ("who created you" in p and "where" in p) or "who and where" in p:
        return "I was created by Ali Mohamoud Jibriel in Gabiley, Somaliland."

    if "what's your name" in p or "what is your name" in p:
        return "My name is Nano."

    # Detect illegal / harmful content
    illegal = [
        "bomb", "explode", "kill", "attack", "weapon",
        "hack someone", "hack wifi password", "break into",
        "steal", "ddos someone", "illegal hacking"
    ]
    for w in illegal:
        if w in p:
            return ("I cannot assist with illegal or harmful actions. "
                    "However, I can teach legal and ethical cybersecurity only.")

    # Ethical hacking questions
    ethical = [
        "ethical hacking", "white hat", "penetration testing",
        "cybersecurity", "network security", "linux security",
        "kali linux", "ctf", "owasp"
    ]
    for w in ethical:
        if w in p:
            return ("Yes, I can help you learn ethical hacking step-by-step. "
                    "What exactly do you want to know?")

    return None

# Language formatter
def get_ai_response_language(prompt, answer):
    lang = detect_language(prompt)

    if lang == "so":
        return f"Jawaab: {answer}"
    if lang == "ar":
        return f"الإجابة: {answer}"
    return answer  # Default English

# Main Gemini response
def get_gemini_response(prompt):
    # Rule-based check first
    fixed = rule_based_answers(prompt)
    if fixed:
        return get_ai_response_language(prompt, fixed)

    try:
        # Main system prompt
        full_prompt = (
            "You are Nano, an AI assistant created by Ali Mohamoud Jibriel "
            "in Gabiley, Somaliland. Your job is to respond politely, clearly, "
            "and with complete, well-explained answers. Do NOT talk unless "
            "the user asks. Do NOT hallucinate.\n\n"
            "You ONLY teach: ethical hacking, WiFi security, pentesting, "
            "and cybersecurity. Never assist in illegal activities.\n\n"
            "Conversation history:\n"
        )

        for line in conversation_memory:
            full_prompt += line + "\n"

        full_prompt += f"User: {prompt}\nAI:"

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=full_prompt,
            config={"temperature": 0.4, "max_output_tokens": 300}
        )

        raw = response.text.strip()
        final = get_ai_response_language(prompt, raw)

        # Save conversation
        conversation_memory.append(f"User: {prompt}")
        conversation_memory.append(f"AI: {final}")

        return final

    except Exception as e:
        return f"Error: {e}"

# Chat Loop
if __name__ == "__main__":
    print("Nano Chatbot (Type 'quit' to exit)\n")
    while True:
        msg = input("You: ")
        if msg.lower() == "quit":
            break
        reply = get_gemini_response(msg)
        print("AI:", reply)
