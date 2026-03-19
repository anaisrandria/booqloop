#!/bin/bash
psql -U "$POSTGRES_USER" -c "SELECT 1 FROM pg_database WHERE datname = 'booqloop_test'" | grep -q 1 || \
psql -U "$POSTGRES_USER" -c "CREATE DATABASE booqloop_test;"