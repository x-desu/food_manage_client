import { IKContext, IKImage, IKUpload } from 'imagekitio-react';
import { useRef } from 'react';
import toast from 'react-hot-toast';
const authenticator =  async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/image`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};
const Image = ({children,setData }) => {

const ref = useRef()
const onError = (err) => {
    console.log("Error", err)
        toast.error("Image upload failed!")
  }



  return (
    <IKContext publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC} 
    urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT} authenticator={authenticator} 
      >
      
        <IKUpload
          fileName="test-upload.png"
          onError={onError}
          onSuccess={setData}
          ref={ref}
          className="hidden"
        />
        <div className="" onClick={() => ref.current.click()}>
            {children}
          </div>
      </IKContext>
  )
}

export default Image