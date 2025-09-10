async function main() {
    console.log("Hello, World!");
    let greet = "Greetings from the async function!";
    console.log(greet);
}

main().then(() => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1);
});

