import { Flex, Typography } from "antd";

export const Logo = () => {
  return (
    <Flex gap={16} align="center">
      <img src="/logo180.png" alt="nasa-space-images-logo" width={60} />
      <Typography.Title level={5}>NASA Space Images</Typography.Title>
    </Flex>
  );
};
