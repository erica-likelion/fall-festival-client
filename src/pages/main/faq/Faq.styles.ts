import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  padding-top: 4.5rem;
  padding-bottom: 1em;
  gap: 1.5rem;
`;

export const FaqList = styled.div`
  display: flex;
  flex-direction: column;
  width: 21rem;
  gap: 1rem;
`;

export const FaqItem = styled.div`
  background: ${(props) => props.theme.colors.grayScale.white};
  border-radius: 1rem;
  border: 1px solid ${(props) => props.theme.colors.grayScale.gy100};
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 0 0.5rem 0 rgb(0 0 0 / 15%);
  white-space: pre-line;
  word-break: keep-all;
`;

export const FaqQuestion = styled.button`
  width: 100%;
  padding: 0 0.5rem 0 1.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
`;

export const QuestionText = styled.p`
  ${(props) => props.theme.fonts.body.medium500}
  color: ${(props) => props.theme.colors.grayScale.black};
  line-height: 1.4;
  margin: 1rem 0;
`;

export const ExpandIcon = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  transition: transform 0.3s ease-in-out;
  transform: ${({ $isExpanded }) => ($isExpanded ? 'rotate(180deg)' : 'rotate(0deg)')};

  path {
    stroke: ${(props) => props.theme.colors.grayScale.gy700};
  }
`;

export const FaqAnswer = styled.div<{ $isExpanded: boolean }>`
  max-height: ${({ $isExpanded }) => ($isExpanded ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
`;

export const AnswerContent = styled.div`
  padding: 0 1rem 1.25rem;

  hr {
    margin: 0 0 1rem;
    border-color: ${(props) => props.theme.colors.grayScale.gy50};
  }
`;

export const AnswerText = styled.p`
  ${(props) => props.theme.fonts.body.small400}
  color: ${(props) => props.theme.colors.grayScale.gy600};
  margin: 0;
  line-height: 1.2;
  margin-bottom: 0.3rem;
`;
