import { Badge, Card, Flex, Image } from "antd";
import { Typography } from "antd";
import dayjs from "dayjs";
import { Source } from "../../types";

export const SourcesListItem = (props: Source) => {
  const { name, description, launch_date, image_url } = props;
  const date = dayjs(launch_date).format("MMMM D, YYYY");
  const isActive = props.status === "Active";

  return (
    <Card
      hoverable
      variant="borderless"
      cover={
        <Image
          className="source-image"
          height={180}
          width={"100%"}
          src={image_url}
        />
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
            <Typography.Paragraph
              ellipsis={{
                rows: 3,
                expandable: "collapsible",
              }}
            >
              {description}
            </Typography.Paragraph>
          </Flex>
        }
      />
    </Card>
  );
};
