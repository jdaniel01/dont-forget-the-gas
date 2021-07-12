
Don't Forget The Gas (DFTG)

by James Daniel Jr.


Table of Contents:

- DFTG HL Overview
- Architecture and Technologies
- FrontEnd
- BackEnd
- Summary and Project Ambitions



DFTG HL Overview:

DFTG is a simple web application that allows users to create lists to keep track of various items (task, objects, people, etc.) The application allows you to perform basic crud operations on lists as well as the list items themselves. Tee time change to 10:30? no problem, upate it by editing the item on your list of golf reservations.

Lists are fun, but let's take it to the next level. let's keep track of our trips as well. Why not have the itinerary and the social media in the same place. Keep a track of trips by name, start/end dates, length of trip in days/miles, and more. Add stops which are linked to real geographic locations which allow you to add rename real places in your trip catalogue. 



2. Architecture and Technologies.

DFTG is a Python led backend which relies on data queries to a Postgresql database with Flask SQLAlchemy class models and commands. I used alembic for migration management and Javascript for frontend database logic. To maintain stable rendering I utilized Redux state managment and API communications to deliver consistent data to React functional components. 



3. FrontEnd

I began my coding career with JavaScript and enjoy using it for all of my projects. I utilized it's asynchronous nature to wait on make calls to the database so the data would be up to date before the user is redirected to the next page. Temporary state is stored using Redux the Thunks to eagerly update state and ensure a consistent user experience.

Lists were updated whenver a list, or item is updated. The last list the member was looking is also updated whenever any part of it or it's items are udated.  Trips are updated whenever trip or stop data has been updated.

For a bit of flare I used InkScape to design the logo and favicon image.


4. Postgres's ORM database was the choice for the project. With multiple connections between models object relational mapping was a good fit. Flask SQLAlchemy provided efficient database models frameworks with dynamic querys and simple implementations. Exploiting model relationships I am able to extract subqueries, saving time on wasted queries.

5. The next steps for DFTG are to flesh out any inconsistencies and implement Trips with Google mapping. I learned more about React and how to ensure state is consistently available for the user. There were many times I would discover an extra statement here and there that would loop my data. When recursive issues used to cause me much trouble, I'm finding them easier to debug.  I've enjoyed the challenges and of this project and look forward to building it out completely.