import clsx from 'clsx';
import Color from 'color';
import React, {useState} from 'react';
import s from './Dropdown.module.scss';
import {DropdownItem} from './DropdownItem';
import CaretIcon from './caretIcon';

export interface IDropdownItem<ID> {
  id: ID;
  icon: string;
  text: string;
  color?: string;
}

export interface IDropdown<ID> {
  itemList: IDropdownItem<ID>[];
  value: ID;
  onChange: (value: ID) => void;
  className?: string;
}

// TODO: hide Dropdown on any click
export function Dropdown<ID = string>({itemList = [], value, onChange, className}: IDropdown<ID>) {
  const [isOpen, setIsOpen] = useState(false);
  const itemListSorted = [...itemList].sort((a) => (a.id === value ? -1 : 0));
  const hasChoice = itemList.length > 1;

  // color customization
  let color: Color | undefined;
  if (itemListSorted[0]?.color) color = Color(itemListSorted[0].color);
  const colorStyle = !isOpen &&
    color && {backgroundColor: color.alpha(0.27).string(), borderColor: color.alpha(0.32).string()};

  return (
    <div className={clsx(s.Dropdown__container, className)}>
      <div
        onClick={() => hasChoice && setIsOpen((isOpen) => !isOpen)}
        style={{height: isOpen ? 40 + 38 * (itemList.length - 1) : 40, ...colorStyle}}
        className={clsx(s.Dropdown, {[s.Dropdown_isOpen]: isOpen})}>
        {hasChoice && <CaretIcon className={clsx(s.Dropdown__caretIcon, {[s.Dropdown__caretIcon_isOpen]: isOpen})}/>}
        {itemListSorted.map((item, i) => (
          <DropdownItem key={'' + item.id} icon={item.icon} onClick={() => i > 0 && onChange(item.id)}>
            {item.text}
          </DropdownItem>
        ))}
      </div>
    </div>
  );
}
