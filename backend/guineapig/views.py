import json

from django.contrib.auth.models import User

from rest_framework.response import Response
from rest_framework import status, views
from guineapig.chatbot import retrieve_response
from guineapig.models import Conversation


class BotView(views.APIView):
    def post(self, request):
        data = request.data
        user_id = data["userId"]
        convo = data["conversationId"]
        question = data["utterance"]
        try:
            answer = retrieve_response(question)
            response = {
                "display": answer,
            }
            Conversation.objects.create(
                user=request.user,
                conversation_id=convo,
                user_utterance=question,
                bert_response=answer)
            return Response(response, status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(json.dumps({"display": "Error"}), status.HTTP_418_IM_A_TEAPOT)

def index(request):
    return render(request, "guineapig/index.html")
