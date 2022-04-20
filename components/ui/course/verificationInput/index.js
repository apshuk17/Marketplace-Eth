import { useState } from "react";
import { Button } from "@components/ui/common";

const VerificationInput = ({ onVerify }) => {
  const [email, setEmail] = useState("");
  return (
    <div className="flex mr-2 relative rounded-md">
      <input
        type="text"
        name="account"
        id="account"
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
        className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
        placeholder="0x2341ab..."
      />
      <Button onClick={() => onVerify(email)}>Verify</Button>
    </div>
  );
};

export default VerificationInput;
