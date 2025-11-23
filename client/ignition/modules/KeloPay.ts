import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const KeloPayModule = buildModule("KeloPayModule", (m) => {
  // Parameters
  const treasuryAddress = m.getParameter("treasuryAddress");
  const platformFeeBasisPoints = m.getParameter("platformFeeBasisPoints", 100); // 1% default fee

  // Deploy KeloPay main contract
  const keloPay = m.contract("KeloPay", [treasuryAddress, platformFeeBasisPoints]);

  return { keloPay };
});

export default KeloPayModule;
