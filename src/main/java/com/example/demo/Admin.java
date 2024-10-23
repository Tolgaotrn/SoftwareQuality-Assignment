package com.example.demo;

public class Admin extends User {
    public Admin(String name, String email) {
        super(name, email);
    }

    @Override
    public void performRoleSpecificFunction() {
        System.out.println("Admin managing semester dates and exam periods.");
    }

    public void defineSemesterPeriod(String start, String end) {
        // Logic to set semester dates
        System.out.println("Semester period set from " + start + " to " + end);
    }

    public void defineExamPeriods(String normal, String appeal, String special) {
        // Logic to set exam periods
        System.out.println("Exam periods defined.");
    }
}