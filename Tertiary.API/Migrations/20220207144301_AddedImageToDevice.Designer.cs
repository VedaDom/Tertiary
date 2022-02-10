﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Tertiary.API.Database;

#nullable disable

namespace Tertiary.API.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20220207144301_AddedImageToDevice")]
    partial class AddedImageToDevice
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("DeviceDeviceRequest", b =>
                {
                    b.Property<int>("DeviceRequestsId")
                        .HasColumnType("int");

                    b.Property<int>("DevicesId")
                        .HasColumnType("int");

                    b.HasKey("DeviceRequestsId", "DevicesId");

                    b.HasIndex("DevicesId");

                    b.ToTable("DeviceDeviceRequest");
                });

            modelBuilder.Entity("Tertiary.API.Models.Device", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Brand")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Quantity")
                        .HasColumnType("int");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Devices");
                });

            modelBuilder.Entity("Tertiary.API.Models.DeviceRequest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("DeviceId")
                        .HasColumnType("int");

                    b.Property<DateTime>("RequestedAt")
                        .HasColumnType("datetime2");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("DeviceRequests");
                });

            modelBuilder.Entity("Tertiary.API.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Firstname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("HashedPassword")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Lastname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("DeviceDeviceRequest", b =>
                {
                    b.HasOne("Tertiary.API.Models.DeviceRequest", null)
                        .WithMany()
                        .HasForeignKey("DeviceRequestsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Tertiary.API.Models.Device", null)
                        .WithMany()
                        .HasForeignKey("DevicesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Tertiary.API.Models.DeviceRequest", b =>
                {
                    b.HasOne("Tertiary.API.Models.User", "User")
                        .WithMany("Requests")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Tertiary.API.Models.User", b =>
                {
                    b.Navigation("Requests");
                });
#pragma warning restore 612, 618
        }
    }
}
