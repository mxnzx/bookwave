import { privateApi, publicApi } from "./index";
import { useQuery } from "@tanstack/react-query";

type Book = {
    bookId : number;
    bookImageUrl:string;
    bookTitle: string;
    author:string;
}

type Mood = {
    moodId : number;
    moodType : string;
    bookList : Book[];
}
type GenreBookList ={
    [key:string]:Book[];
}
type GenreRecommendResponse = {
    favoriteGenreList : String[];
    genreBookList:GenreBookList;
}

type RecentRecommendResponse = {
    recentBookTitle : String,
    recentList : Book[]
}

type BbtiRecommendResponse={
    bbti:String,
    bookList : Book[]
}
type TodayBookResponse={
    todayEmotion:string,
    bookId:number,
    bookTitle:string,
    bookAuthor:string,
    bookImgUrl:string,
}

type moodRecommendResponse={
    moodList : Mood[];
}

//장르별 추천 List
export const fetchGenreRecommendList = async()=>{
    try{
        const response = await privateApi.get("/api/recommend/genre-list");
        return response.data.data;
    }catch(error){
        throw error;
    }
}

export const useGenreRecommend = ()=>{
    return useQuery<GenreRecommendResponse,Error>(
        ['genreRecommendList'],
        fetchGenreRecommendList,
        {
            refetchOnWindowFocus:false
        }
        
    );
}

//최근 읽은 책과 비슷한 장르의 책 추천

export const fetchRecentRecommendList = async()=>{
    try{
        const response = await privateApi.get("/api/recommend/recent-list");
        return response.data.data;
    }catch(error){
        throw error;
    }
}
export const useRecentRecommend = ()=>{
    return useQuery<RecentRecommendResponse,Error>(
        ['recentRecommendList'],
        fetchRecentRecommendList,
        {
            refetchOnWindowFocus:false
        }
    );
}

//bbti 기반 
export const fetchBbtiRecommendList = async()=>{
    try{
        const response = await privateApi.get("/api/recommend/bbti-list");
        return response.data.data;
    }catch(error){
        throw error;
    }
}
export const useBbtiRecommend = ()=>{
    return useQuery<BbtiRecommendResponse,Error>(
        ['bbtiRecommendList'],
        fetchBbtiRecommendList,
        {
            refetchOnWindowFocus:false
        }
    );
}

//오늘의 책 추천
export const fetchTodayBook = async()=>{
    try{
        const response = await privateApi.get("/api/recommend/today-book");
        return response.data.data;
    }catch(error){
        throw error;
    }
}
export const useTodayBook = ()=>{
    return useQuery<TodayBookResponse,Error>(
        ['todayBook'],
        fetchTodayBook,
        {
            refetchOnWindowFocus:false
        }
    );
}

//각 mood 기반
export const fetchMoodBook = async()=>{
    try{
        const response = await privateApi.get("/api/recommend/mood-list");
        return response.data.data;
    }catch(error){
        throw error;
    }
}
export const useMoodBook = ()=>{
    return useQuery<moodRecommendResponse,Error>(
        ['moodBook'],
        fetchMoodBook,
        {
            refetchOnWindowFocus:false
        }
    );
}