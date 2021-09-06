module.exports = function solveSudoku(matrix) {
  const size = 9;
  const boxSize = 3;

  //найти свободные ячейки, кот. не заполнены
  const findEmpty = (matrix) => {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (matrix[r][c] === 0) {
          return [r, c];
        }
      }
    }
    return null;
  }

  const validate = (num, pos, matrix) => {
    const [r, c] = pos;
    //проверяем, что число встречается 1 раз в строке, колонке и секторе
    //в строке
    for (let i = 0; i < size; i++) {
      if (matrix[i][c] === num && i !== r) {
        return false;
      }
    }
    //в колоне
    for (let i = 0; i < size; i++) {
      if (matrix[r][i] === num && i !== c) {
        return false;
      }
    }
    //в секторе
    const boxRow = Math.floor(r / boxSize) * boxSize;
    const boxCol = Math.floor(c / boxSize) * boxSize;
    for (let i = boxRow; i < boxRow + boxSize; i++) {
      for (let j = boxCol; j < boxCol + boxSize; j++) {
        if (matrix[i][j] === num && i !== r && j !== c) {
          return false;
        }
      }
    }
    return true;
  }


  const solve = () => {
    const currPos = findEmpty(matrix);
    //заполняем
    if (currPos === null) {
      return true;
    }
    //подставляем число на пустую ячейку
    for (let i = 1; i < size + 1; i++) {
      const currNum = i;
      const isValid = validate(currNum, currPos, matrix);
      if (isValid) {
        const [x, y] = currPos;
        matrix[x][y] = currNum;

        if (solve()) {
          return true;
        }
        matrix[x][y] = 0;
      }
    }
    return false;
  }

  solve();
  return matrix;
};