import { Badge, Card, Flex } from "antd";
import { Typography } from "antd";
import dayjs from "dayjs";
import { Source } from "../../types";

export const SourcesListItem = (props: Source) => {
  const { name, description, launch_date, image_url } = props;
  const date = dayjs(launch_date).format("MMMM D, YYYY");
  const isActive = props.status === "Active";

  const onClick = () => {
    window.open(image_url, "_blank");
  };

  return (
    <Card
      hoverable
      onClick={onClick}
      cover={
        image_url && <img src={image_url} alt={name} className="source-image" />
      }
    >
      <Card.Meta
        title={
          <Flex align="center" gap={16} justify="space-between">
            <Typography.Text strong className="source-title">
              {name}
            </Typography.Text>
            <Badge
              status={isActive ? "success" : "error"}
              text={isActive ? "Active" : "Inactive"}
            />
          </Flex>
        }
        description={
          <Flex vertical gap={8}>
            <Typography.Text type="secondary" className="source-date">
              {date}
            </Typography.Text>
            <Typography.Text className="source-description">
              {description}
            </Typography.Text>
          </Flex>
        }
      />
    </Card>
  );
};
