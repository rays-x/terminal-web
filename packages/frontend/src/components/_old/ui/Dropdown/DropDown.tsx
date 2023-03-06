import {Dispatch, FC, forwardRef, SetStateAction, useRef, useState} from 'react';
import {useSpring} from '@react-spring/web';
import {animated, config} from 'react-spring';

import {useOutsideAllEvent} from '../../../../presets/helpers/table';
import {DropDownStyled, DropdownStyledProps} from './DropDown-styled';
import DropDownArrow from '../../../../assets/icons/DropDownArrow';

export interface DropDownContentProps<OptionType> {
  options: OptionType[];
  selectedOption: OptionType;
  setSelectedOption: (option: OptionType) => void;
  activeOption: OptionType | null;
  setActiveOption: (option: OptionType | null) => void;
}

export interface DropDownProps<OptionType>
  extends DropDownContentProps<OptionType> {
  title: string;
}

export interface DropDownStateProps<OptionType> {
  options: OptionType[];
  selectedOption: OptionType;
}

export interface UseDropDownState<OptionType> {
  options: OptionType[];
  selected: OptionState<OptionType>;
  active: OptionState<OptionType | null>;
}

export type OptionState<OptionType> = [
  OptionType,
  Dispatch<SetStateAction<OptionType>>
];

interface DropDownInit extends DropdownStyledProps {
  wrapperWidth?: number;
}

export function dropDown<OptionType>({
                                       width,
                                       position,
                                       wrapperWidth
                                     }: DropDownInit): [
  ({
     options,
     selectedOption
   }: DropDownStateProps<OptionType>) => UseDropDownState<OptionType>,
  FC<DropDownProps<OptionType>>
] {
  function useDropDownState<OptionType>({
                                          options,
                                          selectedOption
                                        }: DropDownStateProps<OptionType>): UseDropDownState<OptionType> {
    return {
      options,
      selected: useState<OptionType>(selectedOption),
      active: useState<OptionType | null>(selectedOption)
    };
  }

  const DropDownComponent: FC<DropDownProps<OptionType>> = ({
                                                              options,
                                                              selectedOption,
                                                              setSelectedOption,
                                                              activeOption,
                                                              setActiveOption,
                                                              title
                                                            }) => {
    const [isToggled, setToggle] = useState(false);
    const dropDownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    useOutsideAllEvent([dropDownRef, buttonRef], () => setToggle(false));

    const {y} = useSpring({
      y: isToggled ? 180 : 0,
      config: config.default
    });

    const menuAppear = useSpring({
      transform: isToggled ? 'translate3D(0,10px,0)' : 'translate3D(0,-20px,0)',
      opacity: isToggled ? 1 : 0,
      config: config.default
    });

    return (
      <div style={{position: 'relative', zIndex: 2}}>
        <DropDownStyled.Wrapper
          width={width}
          $wrapperWidth={wrapperWidth}
          onClick={() => setToggle(!isToggled)}
          ref={buttonRef}
        >
          <DropDownStyled.Component>
            <p>{title}</p>
            <animated.p
              style={{transform: y.interpolate((y) => `rotate(-${y}deg)`)}}
            >
              <DropDownArrow/>
            </animated.p>
          </DropDownStyled.Component>
        </DropDownStyled.Wrapper>

        <animated.div style={menuAppear}>
          {isToggled ? (
            <DropDownContent
              ref={dropDownRef}
              options={options}
              selectedOption={selectedOption}
              setSelectedOption={(option) => {
                setToggle(!isToggled);
                setSelectedOption(option);
              }}
              activeOption={activeOption}
              setActiveOption={setActiveOption}
            />
          ) : null}
        </animated.div>
      </div>
    );
  };

  const DropDownContent = forwardRef<HTMLDivElement,
    DropDownContentProps<OptionType>>(
    (
      {
        options,
        selectedOption,
        setSelectedOption,
        activeOption,
        setActiveOption
      },
      ref
    ) => {
      return (
        <DropDownStyled.Content width={width} position={position} ref={ref}>
          {options.map((option, index) => (
            <DropDownStyled.ContentButton
              key={index}
              onClick={() => setSelectedOption(option)}
              onMouseEnter={() => setActiveOption(option)}
              onMouseLeave={() => setActiveOption(null)}
              isSelected={
                activeOption
                  ? activeOption === option
                  : selectedOption === option
              }
            >
              {option as any}
            </DropDownStyled.ContentButton>
          ))}
        </DropDownStyled.Content>
      );
    }
  );

  return [useDropDownState, DropDownComponent];
}
