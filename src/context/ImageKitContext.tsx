import {ReactNode} from "react";
import {IKContext} from "imagekitio-react";

const publicKey = '<YOUR_IMAGEKIT_PUBLIC_KEY>';
const urlEndpoint = '<YOUR_IMAGEKIT_URL_ENDPOINT>';

const authenticator = async () => {
  try {
    const response = await fetch('http://localhost:3001/auth');

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const {signature, expire, token} = data;
    return {signature, expire, token};
  } catch (error) {
    console.log(error);
  }
};

export default function ImageKitContextProvider({children}: { children: ReactNode }) {
  return (
      <IKContext
          publicKey={publicKey}
          urlEndpoint={urlEndpoint}
          authenticator={authenticator}
      >
        {children}
      </IKContext>
  )
}