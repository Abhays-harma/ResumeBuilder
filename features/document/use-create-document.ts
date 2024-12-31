"use client";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { hc } from "hono/client";
import { AppType } from "@/app/api/[[...route]]/route";

export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!);

type ResponseType = InferResponseType<typeof client.api.document.create.$post>;
type RequestType = InferRequestType<typeof client.api.document.create.$post>["json"];

const useCreateDocument = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      console.log("2nd muate func is called");
      console.log("json is:",json);
      
      const response = await client.api.document.create.$post({ json });
      return await response.json();
    },
    onSuccess: (response) => {
      console.log("Response received:", response); // Log response for debugging
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast({
        title: "Success",
        description: "Document created successfully",
        
      });
    },
    onError: (error) => {
      console.error("Mutation error:", error); // Log error for debugging
      toast({
        title: "Error",
        description: "Failed to create document",
        variant: "destructive",
      });
    },
  });

  return mutation;
};

export default useCreateDocument;
