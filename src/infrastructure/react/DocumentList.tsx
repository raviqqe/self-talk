import { styled } from "@linaria/react";
import { defaultImport } from "default-import";
import { useEffect, useState } from "react";
import defaultUseInfiniteScroll from "react-infinite-scroll-hook";
import { PulseLoader } from "react-spinners";
import { useAsync, usePrevious } from "react-use";
import type * as domain from "../../domain.js";
import { Document } from "./Document.js";
import { white } from "./style/colors.js";

const useInfiniteScroll = defaultImport(defaultUseInfiniteScroll);

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
  padding: 1em 0.5em;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const StyledDocument = styled(Document)`
  margin: 0.5em;
`;

export interface Props {
  documents: domain.Document[] | null;
}

export const DocumentList = ({ documents }: Props): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useAsync(async () => {
    setLoading(true);
    setLoading(false);
  }, []);

  const [ref] = useInfiniteScroll({
    hasNextPage: !done,
    loading,
    onLoadMore: async () => {
      setLoading(true);
      setLoading(false);
    },
  });

  const oldLoading = usePrevious(loading);
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (!oldLoading && loading) {
      setLength(documents?.length ?? 0);
    } else if (oldLoading && !loading && documents?.length === length) {
      setDone(true);
    }
  }, [documents, length, loading, oldLoading]);

  return (
    <Container>
      {documents?.map((document) => (
        <StyledDocument document={document} key={document.id} />
      ))}
      {!done && (
        <LoaderContainer ref={ref}>
          <PulseLoader color={white} />
        </LoaderContainer>
      )}
    </Container>
  );
};
