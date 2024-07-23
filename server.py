
from flask import Flask, request, jsonify
from openai import OpenAI

app = Flask(__name__)

client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key="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"
)

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    if not user_message:
        return jsonify({'reply': 'No message received'}), 400

    try:
        completion = client.chat.completions.create(
            model="mistralai/mixtral-8x22b-instruct-v0.1",
            messages=[{"role": "user", "content": user_message}],
            temperature=0.5,
            top_p=1,
            max_tokens=1024,
            stream=False
        )

        bot_reply = ""
        for chunk in completion:
            if chunk.choices[0].delta.content is not None:
                bot_reply += chunk.choices[0].delta.content

        return jsonify({'reply': bot_reply})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'reply': 'Error occurred while generating response'}), 500

if __name__ == '__main__':
    app.run(debug=True)
