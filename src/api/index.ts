/** @format */

import {useContext} from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAuthorizationHeader } from "../constants";
import { AuthContext } from "../AuthContext";

// GET
export function useArticleGet() {
  const { isLoggedIn } = useContext(AuthContext);
  
  return useQuery("articles", () =>
    isLoggedIn
      ? axios.get(`${process.env.REACT_APP_API_BASE}/user/articles`, { headers: getAuthorizationHeader() }).then((response) => response.data).catch((e) => {  return []; })
      : axios.get(`${process.env.REACT_APP_API_BASE}/articles`).then((response) => response.data).catch((e) => {  return []; }),
  );
}


export function useUserArticleGet() {
  return useQuery("user", () =>(
    axios
      .get(`${process.env.REACT_APP_API_BASE}/user/articles`, {
        headers: getAuthorizationHeader(),
      })
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        return [];
      })
  ));
}



export function useCategoriesGet() {
  return useQuery("categories", () =>
    axios
      .get(`${process.env.REACT_APP_API_BASE}/categories`)
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        return [];
      })
  );
}

export function useAuthorsGet() {
  return useQuery("authors", () =>
    axios
      .get(`${process.env.REACT_APP_API_BASE}/authors`)
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        return [];
      })
  );
}

export function useArticlePreferenceGet() {
  return useQuery("preference", () =>
    axios
      .get(`${process.env.REACT_APP_API_BASE}/user/prefrences`, {
        headers: getAuthorizationHeader(),
      })
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        return false;
      })
  );
}

// POST
export function useLogin() {
  const mutation = useMutation(
    (params: { email: string; password: string; remember: boolean }) => {
      return axios.post(`${process.env.REACT_APP_API_BASE}/login`, {
        email: params.email,
        password: params.password,
        remember: params.remember,
      });
    }
  );

  return mutation;
}

export function useSignUp() {
  const mutation = useMutation(
    (params: {
      name: string;
      email: string;
      password: string;
      password_confirmation: string;
    }) => {
      return axios.post(`${process.env.REACT_APP_API_BASE}/register`, {
        name: params.name,
        email: params.email,
        password: params.password,
        password_confirmation: params.password_confirmation,
      });
    }
  );

  return mutation;
}

export function useArticlePreference() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (params: {
      id: string;
      categories: string[];
      sources: string[];
      authors: string[];
    }) => {
      return axios.put(
        `${process.env.REACT_APP_API_BASE}/user/prefrences/${params.id}`,
        {
          user_id: params.id,
          categories: params.categories,
          sources: params.sources,
          authors: params.authors,
        },
        { headers: getAuthorizationHeader() }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("articles");
        queryClient.invalidateQueries("preference");
      },
    }
  );

  return mutation;
}
