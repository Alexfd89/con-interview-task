import { useEffect } from "react";
import { Button, Flex, Form, Input } from "antd";
import { useCreateSourceSearchHistory, useSourceFilters } from "../../hooks";
import { SearchOutlined } from "@ant-design/icons";

type FormValues = {
  search?: string;
};

export const SourcesSearchForm = () => {
  const [form] = Form.useForm();
  const { filters, updateFilters } = useSourceFilters();
  const { mutate: createHistory } = useCreateSourceSearchHistory();

  useEffect(() => {
    form.setFieldsValue({ search: filters.search });
  }, [form, filters.search]);

  const onFinish = (values: FormValues) => {
    updateFilters(values);
    if (values.search) {
      createHistory(values.search.trim());
    }
    form.resetFields();
  };

  return (
    <Form form={form} size="large" layout="inline" onFinish={onFinish}>
      <Flex vertical gap={12}>
        <Form.Item name="search" noStyle>
          <Input.Search
            placeholder="Search..."
            allowClear
            enterButton={
              <Button
                type="primary"
                htmlType="submit"
                icon={<SearchOutlined />}
              />
            }
          />
        </Form.Item>
      </Flex>
    </Form>
  );
};
