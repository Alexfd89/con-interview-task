import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  SourceFilters,
  SourceSearchHistory,
  SourceSearchHistoryFilters,
  SourceSearchHistoryResponse,
  SourcesResponse,
} from "../types";

const API = axios.create({
  baseURL: "/api",
});

const getSources = async (filters: SourceFilters): Promise<SourcesResponse> => {
  const response = await API.get("/sources", { params: filters });
  return response.data;
};

export const useGetSources = (filters: SourceFilters) => {
  return useQuery<SourcesResponse>({
    queryKey: ["sources", filters],
    queryFn: () => getSources(filters),
  });
};

const getSourceSearchHistory = async (
  filters: SourceSearchHistoryFilters
): Promise<SourceSearchHistoryResponse> => {
  const response = await API.get("/sources/history", { params: filters });
  return response.data;
};

export const useGetSourceSearchHistory = (
  filters: SourceSearchHistoryFilters
) => {
  return useQuery<SourceSearchHistoryResponse>({
    queryKey: ["sources", "history", filters],
    queryFn: () => getSourceSearchHistory(filters),
  });
};

const createSourceSearchHistory = async (
  value: string
): Promise<SourceSearchHistory> => {
  const response = await API.post("/sources/history", { value });
  return response.data;
};

export const useCreateSourceSearchHistory = () => {
  const queryClient = useQueryClient();

  return useMutation<SourceSearchHistory, Error, string>({
    mutationFn: (value: string) => createSourceSearchHistory(value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sources", "history"] });
    },
  });
};

const deleteSourceSearchHistory = async (id: string): Promise<void> => {
  await API.delete(`/sources/history/${id}`);
};

export const useDeleteSourceSearchHistory = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id: string) => deleteSourceSearchHistory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sources", "history"] });
    },
  });
};

export const useSourceFilters = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: SourceFilters = useMemo(() => {
    const filters: SourceFilters = {};

    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get("search")?.trim();

    if (search) filters.search = search;

    return filters;
  }, [location.search]);

  const updateFilters = useCallback(
    (newFilters: Partial<SourceFilters>) => {
      const search = newFilters.search?.trim();

      if (search) {
        searchParams.set("search", search);
      } else {
        searchParams.delete("search");
      }

      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  return { filters, updateFilters };
};
