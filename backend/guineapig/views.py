from django.shortcuts import render

def index(request):
    return render(request, "guineapig/index.html")

def lobby(request, room_name):
    return render(request, "guineapig/lobby.html", {"room_name": room_name})