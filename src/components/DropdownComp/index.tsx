import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { DropdownItemType, DropdownListItem } from "./DropdownListItem";
import { useSharedValue } from "react-native-reanimated";

type DropDownComPropsType = {
  header: DropdownItemType;
  options: DropdownItemType[];
};

const NO_OF_ITEMS = 10;

const DropDownCom: React.FC<DropDownComPropsType> = ({ header, options }) => {
  const isExpanded = useSharedValue(false);
  const dropdownItems = [header, ...options];
  let newItems = dropdownItems;
  if (isExpanded) {
    if (NO_OF_ITEMS > dropdownItems.length) {
      newItems = dropdownItems.filter(
        (item, index) => index < dropdownItems.length
      );
    }
    newItems = dropdownItems.filter((item, index) => index < NO_OF_ITEMS);
  }

  return (
    <>
      {newItems.map((item, index) => {
        return (
          <DropdownListItem
            key={index}
            {...item}
            index={index}
            isExpanded={isExpanded}
            dropDownItemsCount={newItems.length}
          />
        );
      })}
    </>
  );
};

export default DropDownCom;

const styles = StyleSheet.create({});
