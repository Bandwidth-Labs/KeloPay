import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const KeloPayRouterModule = buildModule("KeloPayRouterModule", (m) => {
  // Parameters
  const adminAddress = m.getParameter("adminAddress");

  // Deploy KeloPayRouter contract
  const router = m.contract("KeloPayRouter", [adminAddress]);

  return { router };
});

export default KeloPayRouterModule;
