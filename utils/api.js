import axios from "axios";
export const apiUrl = "https://mobile-minga-zarratea.onrender.com/api/"
export const api = axios.create({baseURL: apiUrl})
export const endpoints = {
    signin: "auth/signin",
    signintoken: "auth/signintoken",
    register: "auth/register",
    signout: "auth/signout",
    read_mangas: "mangas",
    read_categories: "categories",
    chapters: "chapters",
    verify: "auth/verify/"
}