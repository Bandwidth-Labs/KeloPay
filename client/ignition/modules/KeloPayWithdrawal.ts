import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const KeloPayWithdrawalModule = buildModule("KeloPayWithdrawalModule", (m) => {
  // Parameters
  const adminAddress = m.getParameter("adminAddress");

  // Deploy KeloPayWithdrawal contract
  const withdrawal = m.contract("KeloPayWithdrawal", [adminAddress]);

  return { withdrawal };
});

export default KeloPayWithdrawalModule;
