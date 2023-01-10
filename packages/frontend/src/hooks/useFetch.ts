import React                                               from 'react';
import fetch,{AxiosError,AxiosRequestConfig,AxiosResponse} from 'axios';
import {set}                                               from 'lodash';

export type FetchRequestConfig=AxiosRequestConfig;
export type FetchResponse<T=any>=AxiosResponse<T>;
export type FetchError<T=any>=AxiosError<T>;

interface ApiAction<T=unknown,E=unknown> extends AxiosRequestConfig{
  onSuccess?: (data: FetchResponse<T>) => void;
  onFailure?: (error: FetchError<E>) => void;
}

interface ReduceProps<T>{
  loading?: boolean;
  data?: FetchResponse<T>['data'];
  error?: FetchError;
}

const fetchFn=<T>(props: FetchRequestConfig): Promise<FetchResponse<T>> => {
  const {data,method}=props;
  const dataOrParams=method? (['GET','DELETE'].includes(method)? 'params': 'data'): 'data';
  set(fetch,'defaults.baseURL',import.meta.env.VITE_APP_BASE_URL||'');
  set(fetch,'defaults.headers.common.Content-Type','application/json');
  return fetch.request({
    withCredentials:true,
    [dataOrParams]:data,
    ...props
  });
};
export const useFetch=<T>({onFailure,onSuccess,...props}: ApiAction<T>) => {
  const [state,dispatch]=React.useReducer(
    (state: any, {data,error}: ReduceProps<T>) => ({loading:false,data,error}),
    {
      data:undefined,
      error:undefined,
      loading:true
    }
  );
  React.useEffect(
    () => {
      fetchFn<T>(props)
        .then((response: FetchResponse) => {
          dispatch({data:response.data});
          if(onSuccess) onSuccess(response);
          return response;
        })
        .catch((error: FetchError) => {
          dispatch({error});
          if(onFailure) onFailure(error);
          return error;
        });
    }, // eslint-disable-next-line
    [JSON.stringify(props)]
  );
  return state;
};
export const useLazyFetch=<T>(
  defaultProps: ApiAction
): [ReduceProps<T>,(lazyProps?: ApiAction<T>) => Promise<FetchResponse<T>>] => {
  const [state,dispatch]=React.useReducer(
    (state,{data,error,loading}: ReduceProps<T>) => ({
      loading:!!loading,
      data,
      error
    }),
    {
      data:undefined,
      error:undefined,
      loading:false
    }
  );
  return [
    state,
    (lazyProps: ApiAction<T>={}) => {
      const {onFailure,onSuccess,...props}={...defaultProps,...lazyProps};
      dispatch({loading:true});
      return fetchFn<T>(props)
        .then((response) => {
          dispatch({data:response.data});
          if(onSuccess) onSuccess(response);
          return response;
        })
        .catch((error) => {
          dispatch({error});
          if(onFailure) onFailure(error);
          throw error;
        });
    }
  ];
};
export default useFetch;
