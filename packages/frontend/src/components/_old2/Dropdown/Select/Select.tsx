import clsx from 'clsx';
import React, {useState} from 'react';
import s from './Select.module.scss';
import CaretIcon from '../caretIcon';
import {SelectItem} from './SelectItem';

export interface ISelectItem<ID> {
  id: ID;
  text: string;
}

export interface ISelect<ID> {
  itemList: ISelectItem<ID>[];
  value: ID;
  onChange: (value: ID) => void;
  className?: string;
}

// TODO: hide Select on any click
export function Select<ID = string>({itemList, value, onChange, className}: ISelect<ID>) {
  const [isOpen, setIsOpen] = useState(false);
  const itemListSorted = [...itemList].sort((a) => (a.id === value ? -1 : 0));
  const hasChoice = itemList.length > 1;
  return (
    <div className={clsx(s.Select__container, className)}>
      <div
        onClick={() => hasChoice && setIsOpen((isOpen) => !isOpen)}
        style={{height: isOpen ? 30 * itemList.length : 30}}
        className={clsx(s.Select, {[s.Select_isOpen]: isOpen})}>
        {hasChoice && <CaretIcon className={clsx(s.Select__caretIcon, {[s.Select__caretIcon_isOpen]: isOpen})}/>}
        {itemListSorted.map((item, i) => (
          <SelectItem key={'' + item.id} onClick={() => i > 0 && onChange(item.id)}>
            {item.text}
          </SelectItem>
        ))}
      </div>
    </div>
  );
}
