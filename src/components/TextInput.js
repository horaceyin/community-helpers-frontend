import { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES, SPACING } from "../../constants";

export const RoundTextInput = ({
  placeholder,
  placeholdertextColor,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      placeholder={placeholder || null}
      placeholderTextColor={placeholdertextColor || COLORS.darkText}
      style={[
        styles.roundTextInput,
        { ...props.extraStyles },
        focused && styles.roundTextInputFocused,
      ]}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  roundTextInput: {
    borderRadius: SPACING,
    backgroundColor: COLORS.lightPrimary,
    marginVertical: SPACING * 1.5,
    padding: SPACING * 2,
    fontSize: SIZES.font,
    fontFamily: FONTS.semiBold,
  },
  roundTextInputFocused: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
});
