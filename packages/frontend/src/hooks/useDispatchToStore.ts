import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';

export default function useDispatchToStore<T>(type: string) {
  const dispatch: Dispatch = useDispatch();
  return (payload: T) => dispatch({ type, payload });
}
