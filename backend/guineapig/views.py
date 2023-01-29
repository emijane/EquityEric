import json

from rest_framework.response import Response
from rest_framework import status, views
from chatbot import retrieve_response
from models import Conversation


class BotView(views.APIView):
    async def get(self, request):
        data = json.loads(request.data)
        user_id = data["userId"]
        convo = data["conversationId"]
        utterance = data["utterance"]
        question = data["utterance"]
        try:
            answer = await retrieve_response(question)
            response = {
                "display": answer,
            }
            c = Conversation(
                user=user_id,
                conversation_id=convo,
                user_utterance=utterance,
                bert_response=answer)
            c.save()
            return Response(json.dumps(response), status.HTTP_418_IM_A_TEAPOT)
        except:
            return Response(json.dumps({"display": "Error"}), status.HTTP_418_IM_A_TEAPOT)

def index(request):
    return render(request, "guineapig/index.html")
