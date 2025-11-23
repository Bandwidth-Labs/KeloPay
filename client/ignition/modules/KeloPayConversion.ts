import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const KeloPayConversionModule = buildModule("KeloPayConversionModule", (m) => {
  // Parameters
  const adminAddress = m.getParameter("adminAddress");

  // Deploy KeloPayConversion contract
  const conversion = m.contract("KeloPayConversion", [adminAddress]);

  return { conversion };
});

export default KeloPayConversionModule;
