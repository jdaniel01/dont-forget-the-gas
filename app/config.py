import os

class Config:
  SECRET_KEY=os.environ.get('SECRET_KEY')
  SQLALCHEMY_TRACK_MODIFICATIONS=False
  SQLALCHEMY_DATABASE_URI="postgresql://dftg_user:Bu5L1f3@localhost/dftg_database"
  SQLALCHEMY_ECHO=True
  REACT_APP_GOOGLE_MAPS_API=os.environ.get("REACT_APP_GOOGLE_MAPS_API")
