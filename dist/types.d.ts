export type TestFramework = 'jest' | 'vitest' | 'pytest' | 'auto';
export interface GeneratorOptions {
    sourceDir?: string;
    outputDir?: string;
    githubUrl?: string;
    githubBranch?: string;
    repositoryRoot?: string;
    verbose?: boolean;
    testFramework?: TestFramework;
}
export interface DescribeBlock {
    name: string;
    lineNumber: number;
    level: number;
}
export type TestType = 'regular' | 'skipped' | 'todo' | 'each' | 'only' | 'concurrent' | 'benchmark' | 'marked' | 'parametrize';
export interface TestCase {
    testName: string;
    shortName: string;
    describeName: string;
    link: string;
    description: string;
    lineNumber: number;
    tags: string[];
    testType: TestType;
    framework?: TestFramework;
}
export interface TestCaseWithFile extends TestCase {
    fileName: string;
    filePath: string;
    category: string;
}
export interface TestDescription {
    description: string[];
    given: string;
    when: string;
    then: string;
    and: string[];
    steps: string[];
}
export interface TestTypeCounts {
    regular: number;
    skipped: number;
    todo: number;
    each: number;
    only: number;
    concurrent: number;
    benchmark: number;
    marked: number;
    parametrize: number;
}
export interface FileSummary {
    total: number;
    categories: Record<string, number>;
    tags: string[];
    testTypes: TestTypeCounts;
    framework?: TestFramework;
}
export interface FileDocumentation {
    fileName: string;
    filePath: string;
    fullPath: string;
    tests: TestCase[];
    summary: FileSummary;
    framework?: TestFramework;
}
