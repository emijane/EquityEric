import openai
import random
import os

# Load 'em from environmental variables
OPEN_AI_KEYS = [
    os.getenv(key)
    for key in filter(lambda k: k.startswith("OPEN_API_KEY_"), os.environ.keys())
]

OPEN_AI_HYPERPARAMETERS = {
    # What sampling temperature to use. Higher values means the model will take
    # more risks. Try 0.9 for more creative applications, and 0 (argmax
    # sampling) for ones with a well-defined answer.
    # We generally recommend altering this or top_p but not both.
    "temperature": 0,
    # How many words to spit out
    "max_tokens": 100,
    # An alternative to sampling with temperature, called nucleus sampling,
    # where the model considers the results of the tokens with top_p probability
    # mass. So 0.1 means only the tokens comprising the top 10% probability mass
    # are considered.
    # We generally recommend altering this or temperature but not both.
    "top_p": 1,
    # Number between -2.0 and 2.0. Positive values penalize new tokens based on
    # their existing frequency in the text so far, decreasing the model's
    # likelihood to repeat the same line verbatim.
    "frequency_penalty": 0.0,
    # Number between -2.0 and 2.0. Positive values penalize new tokens based on
    # whether they appear in the text so far, increasing the model's likelihood
    # to talk about new topics.
    "presence_penalty": 0.0,
}


def retrieve_context(question: str) -> list[str]:
    """Return a list of relevant factsheets required to answer the question."""
    return [
        # TODO: max working on this
        "A Health Savings Account (HSA) is a tax-advantaged account created for or by individuals covered under high-deductible health plans (HDHPs) to save for qualified medical expenses.",
        "Contributions are made into the account by the individual or their employer and are limited to a maximum amount each year."
        "The contributions are invested over time and can be used to pay for qualified medical expenses, such as medical, dental, and vision care and prescription drugs.",
    ]


def retrieve_response(question: str):
    """Given a user's question, generate a response."""
    openai.api_key = random.choice(
        OPEN_AI_KEYS
    )  # Pick a random one so we don't get rate limited by just one

    relevant_context = retrieve_context(question)

    response = openai.Completion.create(
        model="text-davinci-003",
        prompt="\n".join(relevant_context) + f"\nQ: {question}\nA: ",
        stop=["\n"],
        **OPEN_AI_HYPERPARAMETERS,
    )

    if "choices" in response:
        return response["choices"][0]["text"]

    raise NotImplementedError("Not sure what to do here")
