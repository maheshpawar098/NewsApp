import {AxiosRequestConfig, AxiosPromise} from 'axios';

type Request = {
  get: (config: AxiosRequestConfig) => AxiosPromise<any>;
  post: (config: AxiosRequestConfig) => AxiosPromise<any>;
  put: (config: AxiosRequestConfig) => AxiosPromise<any>;
};

type TopStory = {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

export type {Request, TopStory};
