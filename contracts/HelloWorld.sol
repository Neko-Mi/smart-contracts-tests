// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

contract HelloWorld {

    function sayHello() public pure returns (string memory) {
        return "Hello World!!!!";
    }

    function getFactorial(uint n) public pure returns (uint256) {
        uint f = 1;

        for (uint i = 1; i <= n; i++) {
            f *= i;
        }

        return f;
    }

    function calculate(uint256 x, bytes32 oper, uint256 y) public pure returns (uint256) {
        if (oper == "+") {
            return x + y;
        }

        if (oper == "-") {
            return x - y;
        }

        if (oper == "*") {
            return x * y;
        }

        if (oper == "/") {
            return x / y;
        }

        return 0;
    }
    
}

