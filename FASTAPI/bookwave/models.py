from sqlalchemy import Column, Integer, String, ForeignKey, Float, Double
from sqlalchemy.orm import relationship

from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Book(Base):
    __tablename__ = "book"
    id = Column(Integer, primary_key=True, index=True)
    genre_detail_dict_id = Column(Integer, ForeignKey("genre_detail_dict.id"))
    isbn = Column(String(20), nullable=False, unique=True)
    title = Column(String(200), nullable=False)
    author = Column(String(300), nullable=False)
    content = Column(String(300), nullable=False)
    image_url = Column(String(200))
    publisher = Column(String(100), nullable=False)
    score = Column(Double, nullable=False, default=0)
    publish_date = Column(String(10), nullable=False)
    emotion = Column(String(20))
    genre_detail = relationship("GenreDetailDict", back_populates="books")
    emotion2 = relationship("BookEmotion", uselist=False, back_populates="book")


class BookEmotion(Base):
    __tablename__ = 'book_emotion'
    
    book_id = Column(Integer, ForeignKey('book.id'), primary_key=True)
    happy = Column(Float, nullable=False)
    confidence = Column(Float, nullable=False)
    peace = Column(Float, nullable=False)
    sad = Column(Float, nullable=False)
    angry = Column(Float, nullable=False)
    scare = Column(Float, nullable=False)
    tired = Column(Float, nullable=False)
    regret = Column(Float, nullable=False)

    book = relationship("Book", back_populates="emotion2")

class GenreDict(Base):
    __tablename__ = "genre_dict"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)

    genre_details = relationship("GenreDetailDict", back_populates="genre")

class GenreDetailDict(Base):
    __tablename__ = "genre_detail_dict"
    id = Column(Integer, primary_key=True, index=True)
    genre_dict_id = Column(Integer, ForeignKey("genre_dict.id"))
    name = Column(String(255))

    genre = relationship("GenreDict", back_populates="genre_details")
    books = relationship("Book", back_populates="genre_detail")