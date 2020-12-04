#!/usr/bin/env python
# coding: utf-8

# In[1]:


from flask import Flask,jsonify
from flask import request
from flask import render_template
import os
from PIL import Image
import pytesseract, re
from pytesseract import Output
import requests
from io import BytesIO


# In[2]:


pytesseract.pytesseract.tesseract_cmd = r'C:\\Program Files\\Tesseract-OCR\\tesseract.exe' 


# In[3]:


tessdata_dir_config = r'--tessdata-dir "C:\\Program Files\\Tesseract-OCR\\tessdata"'


# In[4]:


app = Flask(__name__)


# In[5]:


@app.route('/extractdata', methods=['GET'])
def extract_data():
    
    url = "https://raw.githubusercontent.com/soumyajit4419/How_Healthy_Are_You/master/Image%20to%20Text%20Extraction/Reports/Blood%20Count%20Report.JPG?token=ALMSHDNOYCQIQDGAGZHNBCC72MMVG"
    response = requests.get(url)
    
    img_data = pytesseract.image_to_data(Image.open(BytesIO(response.content)),output_type=Output.DICT,lang="eng",config=tessdata_dir_config)
    
    parse_text = []
    word_list = []
    last_word = ''
    
    for word in img_data['text']:
    
        if word!='':
            word_list.append(word)
            last_word= word
        
        if (last_word!='' and word == '') or (word==img_data['text'][-1]):
        
            parse_text.append(word_list)
            word_list= []
        
    list_final = [x for x in parse_text if x != []]
    
    
    new_dict={}
    
    ans=False
    
    for i in range(len(list_final)):
        
        if(list_final[i][0]=='Name'):
            new_dict['Name']=list_final[i][2]
        
        elif(list_final[i][0]=='Age'):
            new_dict['Age']=list_final[i][2]

        
        elif(list_final[i][0]=='Date'):
            new_dict['Date']=list_final[i][2]

        elif(list_final[i][0]=='Haemoglobin'):
            new_dict['Haemoglobin']=list_final[i][1]
        
        elif(list_final[i][0]=='RBC'):
            new_dict['RBC']=list_final[i][1]
        
        elif(list_final[i][0]=='Platelet'):
            new_dict['Platelet Count']=list_final[i][2]
    
        elif(list_final[i][0]=='Gender;' or list_final[i][0]=='Gender:'):
            new_dict['Gender']=list_final[i][1]
    
        elif(list_final[i][0]=='Gender'):
            new_dict['Gender']=list_final[i][2]
        
        if(len(list_final[i])>=2):
        
            if(list_final[i][1]=="mgs/dt" or list_final[i][1]=='mgs/dl' and not ans):
            
                new_dict['Blood Glucose(F)']=list_final[i][0]
                new_dict['Blood Glucose(PP)']=list_final[i+1][0]
                ans=True

    
    return jsonify(new_dict) 


# In[ ]:


if __name__ == '__main__':
    app.run()


# In[ ]:





# In[ ]:





# In[ ]:




