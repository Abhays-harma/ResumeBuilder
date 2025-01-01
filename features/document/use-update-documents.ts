"use client";

import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useParams } from "next/navigation";
import { hc } from "hono/client";
import { AppType } from "@/app/api/[[...route]]/route";
export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!);

type ResponseType = InferResponseType<
  (typeof client.api.document.update)[":documentId"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.document.update)[":documentId"]["$post"]
>["json"];

const useUpdateDocument = () => {
  const param = useParams();
  const queryClient = useQueryClient();

  const documentId = param.documentId as string;
  

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
        console.log("Going to update");
        
      const response = await client.api.document.update[":documentId"].$post({
        param: {
          documentId: documentId,
        },
        json,
      });
      console.log("response: ",response);
      
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["document", documentId],
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update document",
        variant: "destructive",
      });
    },
  });

  return mutation;
};

export default useUpdateDocument;