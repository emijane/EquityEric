#written by Maksim Aleksandrovich Artemev
import re
import gensim
from gensim.parsing.preprocessing import remove_stopwords, STOPWORDS



def context_filter(user_question: str):
    npl_user_question = remove_stopwords(user_question) # clean user question to pass to AI 
    
    context = []
    with open('healthcare.txt') as input_file:  # read thru input file
        for line in input_file:
            context.append(line.lower().strip()[2:])
            
            
    user_token = set(npl_user_question.replace("?", "").lower().split(" "))
    relevant_context = []
    
    for blob in context:
        context_token = set(blob.split())
        if user_token & context_token:
            relevant_context.append(blob)
    
    return relevant_context

    

def main():
    print(context_filter("How do I afford health insurance?"))
    


if __name__ == '__main__':
    main()
