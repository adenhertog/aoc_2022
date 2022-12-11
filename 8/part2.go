package main

import "fmt"

func calculateScoreForTree(row int, col int, trees [][]Tree) int {
	rows := len(trees)
	cols := len(trees[0])
	tree := trees[row][col]

	// row to left
	left := 0
	for i := col - 1; i >= 0; i-- {
		left++
		if trees[row][i].Height >= tree.Height {
			break
		}
	}

	// row to right
	right := 0
	for i := col + 1; i < cols; i++ {
		right++
		if trees[row][i].Height >= tree.Height {
			break
		}
	}

	// col to top
	top := 0
	for i := row - 1; i >= 0; i-- {
		top++
		if trees[i][col].Height >= tree.Height {
			break
		}
	}

	// col to bottom
	bottom := 0
	for i := row + 1; i < rows; i++ {
		bottom++
		if trees[i][col].Height >= tree.Height {
			break
		}
	}

	return top * bottom * left * right
}

func calculateScore(trees [][]Tree) {
	for i, row := range trees {
		for j, _ := range row {
			score := calculateScoreForTree(i, j, trees)
			trees[i][j].Score = score
		}
	}
}

func findHighestScore(trees [][]Tree) int {
	highest := -1
	for _, row := range trees {
		for _, tree := range row {
			if tree.Score > highest {
				highest = tree.Score
			}
		}
	}
	return highest
}

func part2() {
	trees := parseInput("input")
	calculateScore(trees)
	highestScore := findHighestScore(trees)
	fmt.Printf("%v\n", highestScore)
}
