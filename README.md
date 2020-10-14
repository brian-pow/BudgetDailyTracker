This  application was developed to facilitate simple day-to-day tracking of spending money and additional unplanned expenses (e.g., food, clothing, parking, etc.). This does not include planned expenses (e.g., rent, utilities, etc.). 

**Two main reasons for development:**

1) I've tried many budget apps in the past, but found them all too complex for my needs. I prefer to set a certain amount of my income for spending (i.e., after subtracting retirement, personal savings, planned expenses, etc.) and calculate a "per day" allotment which I can track against in real-time. 

    *Example: My calculated spending allotment comes to $25 each day. On Monday, I purchase a $15 meal. I log the $15 at the time of purchase. On Tuesday, I now have $35 to spend ($10 remainder for Monday, in addition to Tuesday's allotment). I've found that this method allows me to know exactly where I stand financially before and after any purchases. Effort required to keep up with this type of logging is minimal (it takes 20 seconds to log a purchase). This also makes it easy to save for an upcoming purchase (e.g., if I know I'm going to spend $100 on a meal during the upcoming weekend, I can watch my spending allotment grow throuhgout the week as I refrain from making any unnecessary purchases)* 

2) Prior to the development of the application, I had been utilizing a Google Sheets document for tracking. I like being able to see all of my financial tracking information on the spreadsheet, and did not want to lose this functionality. All updates made through the application update the master Google Sheets document so I can see all information at once and make any necessary corrections (e.g., if I suddenly receive a raise or a pay cut, if rent changes, etc.)

**The application contains the following components:**

**1) GoogleSheetsAPI**
This is a REST API deployed on AWS using the Serverless Framework. It exists to access and edit the master Google Sheets document and offers contains read and edit capabilities.

**2) LogsAPI**
This is a REST API deployed on AWS using the Serverless Framework. It exists to log information attached to each expense (e.g., type, description) in a DynamoDB database and offers read and edit capabilities.

**3) Apollo**
This is an Apollo Server layer that allows access to each REST API.

**4) ReactApp**
This is a React application (designed for mobile devices) that allows client access to the API. I now use this application for my day-to-day financial tracking.

**Screenshots:**
1) Landing page for application.
![IMG_0951](https://user-images.githubusercontent.com/42954670/95929985-fb6ffb00-0d8a-11eb-8d3a-10c2ccf87207.PNG)

2) New expense entry.
![IMG_0952](https://user-images.githubusercontent.com/42954670/95930004-0591f980-0d8b-11eb-9ff8-50ad13cd1a32.PNG)

3) Expense logs.
![IMG_0954](https://user-images.githubusercontent.com/42954670/95930017-10e52500-0d8b-11eb-8435-71086369c9cd.PNG)

4) Sample Google Sheets layout.
![image](https://user-images.githubusercontent.com/42954670/95929591-ff4f4d80-0d89-11eb-9807-62e47e5dd867.png)
