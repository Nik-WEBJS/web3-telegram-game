const hre = require("hardhat");

async function main() {
  // Получаем фабрику контракта
  const Greeter = await hre.ethers.getContractFactory("Greeter");

  // Разворачиваем контракт
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  // Ждём завершения деплоя
  await greeter.waitForDeployment();

  // Получаем адрес контракта
  const contractAddress = await greeter.getAddress();
  console.log("Greeter deployed to:", contractAddress);
}

// Запускаем скрипт
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
