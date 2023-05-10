/** @format */

import Cookies from "js-cookie";

export interface Option {
  readonly value: string;
  readonly label: string;
}

export const sourcesData: readonly Option[] = [
  { label: "News Api", value: "newapi" },
  { label: "Guardian", value: "guardian" },
  { label: "Newyork Times", value: "nytime" },
];


export interface PreferenceProps {
    id: number;
    label: string;
    selected: boolean;
  }
  

  export interface SignUpFormProps {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  };

  export interface PostDataProps {
    id: number;
    category: string;
    title: string;
    description: string;
    author: string;
    date: string;
    urlToImage: string;
  }

  

  export function getAuthorizationHeader() {
    const token = Cookies.get("token");
    return {
      Authorization: `Bearer ${token}`
    };
  }