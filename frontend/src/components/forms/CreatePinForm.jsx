import { Box, FormControl, Input } from "@yamada-ui/react";

const CreatePinForm = () => {
  return (
    <Box
      border="1px solid #ccc"
      borderRadius="8px"
      padding="4"
      width="100%"
      maxWidth="500px"
    >
      <FormControl
        isRequired
        label="名前を登録してください"
        errorMessage="場所の名前は必須です"
      >
        <Input placeholder="例：名古屋駅 スターバックス前" />
      </FormControl>
    </Box>
  );
};

export default CreatePinForm;
