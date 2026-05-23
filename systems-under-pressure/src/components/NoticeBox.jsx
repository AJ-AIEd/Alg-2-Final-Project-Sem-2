import Callout from "./Callout.jsx";

export default function NoticeBox({ children }) {
  return (
    <Callout variant="info" prefix="Look for:">
      {children}
    </Callout>
  );
}
