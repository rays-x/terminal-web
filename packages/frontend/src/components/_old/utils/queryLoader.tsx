import React from 'react';
import {Loader} from '../ui/Loader/Loader';
export function queryLoader(query: any) {
  return query ? (
    <Loader/>
  ) : null;
}